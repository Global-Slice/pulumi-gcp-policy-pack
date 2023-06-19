import {
    EnforcementLevel,
    Policies,
    PolicyPack,
    PolicyPackConfig,
    ResourceValidationPolicy,
    StackValidationPolicy
} from '@pulumi/policy';

import { defaultEnforcementLevel } from "./enforcementLevel";

const defaultPolicyPackName = "pulumi-awsguard";

// Internal map of registered policies;
const registeredPolicies: Record<string, ResourceValidationPolicy | StackValidationPolicy> = {};

export class GCPGuard extends PolicyPack {
    constructor(args?: GCPGuardArgs);
    constructor(name: string, args?: GCPGuardArgs);
    constructor(nameOrArgs?: string | GCPGuardArgs, maybeArgs?: GCPGuardArgs) {
        const [n, a] = getNameAndArgs(nameOrArgs, maybeArgs);

        const policies: Policies = [];
        for (const key of Object.keys(registeredPolicies)) {
            policies.push(registeredPolicies[key]);
        }

        const initialConfig = getInitialConfig(registeredPolicies, a);

        super(n, { policies, enforcementLevel: defaultEnforcementLevel }, initialConfig);
    }

}


/**
 * Argument bag for configuring {@link GCPGuard} policies.
 */
export interface GCPGuardArgs {
    all?: EnforcementLevel;
    // Note: Properties to configure each policy are added to this interface (mixins) by each module.
}

/** @internal */
export function registerPolicy<K extends keyof GCPGuardArgs>(
    property: Exclude<K, "all">,
    policy: ResourceValidationPolicy | StackValidationPolicy): void {

    if (property === "all") {
        throw new Error("'all' is reserved.");
    }
    if (property in registeredPolicies) {
        throw new Error(`${property} already exists.`);
    }
    if (!policy) {
        throw new Error(`policy is falsy.`);
    }
    registeredPolicies[property] = policy;
}

/**
 * Testable helper to get the name and args from the parameters,
 * for use in the policy pack's constructor.
 * @internal
 */
export function getNameAndArgs(
    nameOrArgs?: string | GCPGuardArgs,
    maybeArgs?: GCPGuardArgs): [string, GCPGuardArgs | undefined] {

    let name = defaultPolicyPackName;
    if (typeof nameOrArgs === "string") {
        name = nameOrArgs;
    } else if (typeof nameOrArgs === "object") {
        maybeArgs = nameOrArgs;
    }
    return [name, maybeArgs];
}

/**
 * Converts args with camelCase properties, to a new object that uses the
 * policy name as the property names rather than the camelCase names.
 * @internal
 */
export function getInitialConfig(
    policyMap: Record<string, ResourceValidationPolicy | StackValidationPolicy>,
    args?: GCPGuardArgs,
): PolicyPackConfig | undefined {
    if (!args) {
        return undefined;
    }

    const result: PolicyPackConfig = {};
    for (const key of Object.keys(args) as Array<keyof GCPGuardArgs>) {
        const val = args[key];
        if (!val) {
            continue;
        }

        // If "all", just add it to the resulting object.
        if (key === "all") {
            result["all"] = val;
            continue;
        }

        // Otherwise, lookup the actual policy name, and use that as the key in
        // the resulting object.
        const policy = policyMap[key];
        if (policy) {
            result[policy.name] = val;
        }
    }
    return result;
}

import * as gcp from '@pulumi/gcp';
import {EnforcementLevel, ResourceValidationPolicy, validateResourceOfType} from "@pulumi/policy";
import {registerPolicy} from "./gcpGuard";

// Mixin additional properties onto AwsGuardArgs.
declare module './gcpGuard' {
    interface GCPGuardArgs {
        cloudRunServiceDeprecation?: EnforcementLevel;
        cloudRunIamBindingDeprecation?: EnforcementLevel;
        cloudRunIamPolicyDeprecation?: EnforcementLevel;
        cloudRunDomainMappingDeprecation?: EnforcementLevel;
        cloudRunIamMemberDeprecation?: EnforcementLevel;
    }
}

export interface CloudRunSettingsArgs {
    /** */
    deprecation?: boolean
}

/** @interface */
export const cloudRunServiceDeprecation: ResourceValidationPolicy = {
    name: 'cloud-run-v1-service-deprecation',
    description: '',
    enforcementLevel: 'mandatory',
    configSchema: {
        properties: {
            onlyPrivateIP: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.cloudrun.Service, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudRunSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudRunServiceDeprecation', cloudRunServiceDeprecation);

/** @interface */
export const cloudRunDomainMappingDeprecation: ResourceValidationPolicy = {
    name: 'cloud-run-v1-domain-mapping-deprecation',
    description: '',
    enforcementLevel: 'mandatory',
    configSchema: {
        properties: {
            onlyPrivateIP: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.cloudrun.DomainMapping, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudRunSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudRunDomainMappingDeprecation', cloudRunDomainMappingDeprecation);

/** @interface */
export const cloudRunIamBindingDeprecation: ResourceValidationPolicy = {
    name: 'cloud-run-v1-iam-binding-deprecation',
    description: '',
    enforcementLevel: 'mandatory',
    configSchema: {
        properties: {
            onlyPrivateIP: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.cloudrun.IamBinding, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudRunSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudRunIamBindingDeprecation', cloudRunIamBindingDeprecation);

/** @interface */
export const cloudRunIamPolicyDeprecation: ResourceValidationPolicy = {
    name: 'cloud-run-v1-iam-policy-deprecation',
    description: '',
    enforcementLevel: 'mandatory',
    configSchema: {
        properties: {
            onlyPrivateIP: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.cloudrun.IamPolicy, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudRunSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudRunIamPolicyDeprecation', cloudRunIamPolicyDeprecation);

/** @interface */
export const cloudRunIamMemberDeprecation: ResourceValidationPolicy = {
    name: 'cloud-run-v1-iam-member-deprecation',
    description: '',
    enforcementLevel: 'mandatory',
    configSchema: {
        properties: {
            onlyPrivateIP: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.cloudrun.IamMember, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudRunSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudRunIamMemberDeprecation', cloudRunIamMemberDeprecation);

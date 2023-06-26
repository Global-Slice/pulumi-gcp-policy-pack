
import * as gcp from '@pulumi/gcp';
import {EnforcementLevel, ResourceValidationPolicy, validateResourceOfType} from "@pulumi/policy";
import {registerPolicy} from "./gcpGuard";

// Mixin additional properties onto AwsGuardArgs.
declare module './gcpGuard' {
    interface GCPGuardArgs {
        cloudBuildTriggerDeprecation?: EnforcementLevel;
        cloudBuildBitbucketServerConfigDeprecation?: EnforcementLevel;
        cloudBuildWorkerPoolDeprecation?: EnforcementLevel;
    }
}

export interface CloudBuildSettingsArgs {
    /** */
    deprecation?: boolean
}

/** @interface */
export const cloudBuildTriggerDeprecation: ResourceValidationPolicy = {
    name: 'cloud-build-v1-trigger-deprecation',
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
    validateResource: validateResourceOfType(gcp.cloudbuild.Trigger, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudBuildSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudbuildv2.');
        }
    }),
}

registerPolicy('cloudBuildTriggerDeprecation', cloudBuildTriggerDeprecation);

/** @interface */
export const cloudBuildBitbucketServerConfigDeprecation: ResourceValidationPolicy = {
    name: 'cloud-build-v1-bitbucket-server-config-deprecation',
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
    validateResource: validateResourceOfType(gcp.cloudbuild.BitbucketServerConfig, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudBuildSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudBuildBitbucketServerConfigDeprecation', cloudBuildBitbucketServerConfigDeprecation);

/** @interface */
export const cloudBuildWorkerPoolDeprecation: ResourceValidationPolicy = {
    name: 'cloud-build-v1-worker-pool-deprecation',
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
    validateResource: validateResourceOfType(gcp.cloudbuild.WorkerPool, (instance, args, reportViolation) => {
        const { deprecation } = args.getConfig<CloudBuildSettingsArgs>();
        if (deprecation) {
            reportViolation('You are using old api. Use new cloudrunv2.');
        }
    }),
}

registerPolicy('cloudBuildWorkerPoolDeprecation', cloudBuildWorkerPoolDeprecation);

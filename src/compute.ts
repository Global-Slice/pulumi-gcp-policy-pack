
import * as gcp from '@pulumi/gcp';
import {EnforcementLevel, ResourceValidationPolicy, validateResourceOfType} from "@pulumi/policy";
import {registerPolicy} from "./gcpGuard";

// Mixin additional properties onto AwsGuardArgs.
declare module './gcpGuard' {
    interface GCPGuardArgs {
        computeSettings?: EnforcementLevel;
    }
}

export interface ComputeSettingsArgs {
    /** */
    onlyPrivateIP?: boolean
}

/** @interface */
export const settings: ResourceValidationPolicy = {
    name: ' discouraged-gcp-public-ip-address',
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
    validateResource: validateResourceOfType(gcp.compute.Instance, (instance, args, reportViolation) => {
        const { onlyPrivateIP } = args.getConfig<ComputeSettingsArgs>();
        if (onlyPrivateIP && instance.networkInterfaces.some((net) => net.accessConfigs)) {
            reportViolation('Associating public IP address is discouraged.');
        }
    }),
}

registerPolicy('computeSettings', settings);

import { ResourceValidationPolicy, validateResourceOfType } from '@pulumi/policy';
import * as gcp from '@pulumi/gcp';

export interface SQLDatabaseSettingsArgs {
    /** */
    requireSSL?: boolean
}

/** @interface */
export const settings: ResourceValidationPolicy = {
    name: '',
    description: '',
    configSchema: {
        properties: {
            requireSSL: {
                type: "boolean",
                default: true,
            }
        },
    },
    validateResource: validateResourceOfType(gcp.sql.DatabaseInstance, (databaseInstance, args, reportViolation) => {
        const { requireSSL } = args.getConfig<SQLDatabaseSettingsArgs>();
        if (requireSSL && databaseInstance.settings?.ipConfiguration?.requireSsl !== true) {
            reportViolation("SQL database must require ssl.");
        }
    })
}
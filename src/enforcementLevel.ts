import { EnforcementLevel } from "@pulumi/policy";

/** @internal */
export const defaultEnforcementLevel: EnforcementLevel = "advisory";

/** @internal */
export function isEnforcementLevel(o: any): o is EnforcementLevel {
    // Ensures all possible values are covered in the switch below.
    const exhaustiveFalse = (_: never) => false;

    if (typeof o === "string") {
        const enforcementLevel = <EnforcementLevel>o;
        switch (enforcementLevel) {
            case "advisory":
            case "disabled":
            case "mandatory":
                return true;
            default:
                return exhaustiveFalse(enforcementLevel);
        }
    }
    return false;
}
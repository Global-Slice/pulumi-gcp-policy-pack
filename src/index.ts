
import { GCPGuard, GCPGuardArgs } from "./gcpGuard";

// Import each area to add GCPGuardArgs mixins and register policies.

export { GCPGuard, GCPGuardArgs };

// To create a policy pack using all of the GCP Guard rules,  create
// a new NPM module and add the following code:
//
// Using JavaScript
//      const gcpguard = require("pulumi-gcp-policy-pack");
//      new gcpguard.GCPGuard({ all: "mandatory" });
//
// Using TypeScript
//      import { GCPGuard, GCPGuardArgs } from "pulumi-gcp-policy-pack";
//      new GCPGuard({ all: "mandatory" });
//
// Though you may want to configure any individual rules or their
// settings by writing more code.
//
// Fore more information on enabling and configuring GCP Guard, see:
// https://www.pulumi.com/docs/guides/crossguard
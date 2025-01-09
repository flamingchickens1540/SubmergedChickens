{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
    devDB = {
      url = "github:hermann-p/nix-postgres-dev-db";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
      devDB,
      systems,
    }:
    utils.lib.eachSystem (import systems) (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        db = devDB.outputs.packages.${system};
      in
      {
        devShells.default =
          with pkgs;
          mkShell {
            env = {
              PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
              PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
              PRISMA_SCHEMA_ENGINE_BINARY = "${prisma-engines}/bin/schema-engine";
            };
            buildInputs = [
              postgresql_17
              db.start-database
              db.stop-database
              db.psql-wrapped
              bun
              nodePackages_latest.prettier
              openssl
            ];
            shellHook = ''
              export PG_ROOT=$(git rev-parse --show-toplevel)
            '';
          };
      }
    );
}

# Akamai HMAC Token validation and generation Tool

The package uses the Akamai HMAC token verification strategy to generate and verify tokens.

Reference:
- https://github.com/akamai/EdgeAuth-Token-Node
- https://techdocs.akamai.com/adaptive-media-delivery/docs/add-token-auth

## Usage

### Prerequisites

- Install NodeJS: https://nodejs.org/en/
- Install Git: https://git-scm.com/downloads
- Open the terminal in the application folder

### Install

Open a new directory ond clone the git repository.

```bash
git clone 
```

### Generate a token

```bash
# Usage: node cli.js <key> generate <acl> <window>
node cli.js test-key generate acl-string 36000
# returns: st=1643130409~exp=1643134009~acl=acl-string~hmac=241167232a6c90c08c5075c68a47e757bd67507c0c341241f17ea17adb1d6e69
```

### Validate a token

```bash
# Usage: node cli.js <key> validate <token>
node cli.js test-key validate st=1643120379~exp=164312037936000~acl=acl-string~hmac=87af7e648355ce6e669d97c65dbd62fe297e210d652faa213477ebb0183d223d
# returns: true, false
```

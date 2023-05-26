# pipeline-action

This action posts BuildInfo to [Unleash pipeline](https://github.com/bricks-softwar`e/unleash-pipeline). The buildinfo contains enough information for pipeline to add another entry for the project it receives the data for.

## Inputs

### `shaMinLength`
**Optional** How many characters to keep of the commit sha. Default `"7"`. Beware though, this does not do any effort to keep the sha unique unlike what `git rev-parse --short=7 HEAD` would do. It simply performs `substring(0, shaMinLength)` on the sha of the repo. So if your project has tens of thousands of commits you might want to override this

### `project`
**Required** The name of the pipeline project this update should be posted for. E.g. `unleash-edge` or `unleash-cloud`

### `image`
**Required** The unique docker identifier for your image. E.g. `unleashorg/unleash-server` or `<awsid>.dkr.ecr.<awsregion>.amazonaws.com/unleash-edge`

### `tag`
**Optional** The unique tag for your image. Defaults to `sha-<GITHUB_SHA.substring(0, shaMinLength)>`

### `pipelineUrl`
**Optional** The target of the buildinfo update. Defaults to `https://sandbox.getunleash.io/pipeline/build_info`
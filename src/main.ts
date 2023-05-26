import * as core from '@actions/core';
import * as httpClient from '@actions/http-client';
import {getBuildInfo} from './build-info';

/* eslint-disable @typescript-eslint/no-unused-vars */
async function run(): Promise<void> {
    try {
        const buildInfo = getBuildInfo();
        const pipelineUrl = core.getInput('pipelineUrl');
        const client = new httpClient.HttpClient('gha-pipeline-poster');
        await client.postJson(pipelineUrl, buildInfo);
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

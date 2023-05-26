import * as core from '@actions/core';
import * as github from '@actions/github';

export interface Commit {
    slug: string;
    id: string;
}
export interface Trigger {
    type: string;
    source: string;
    commitIds: string[];
}
export interface DockerInfo {
    image: string;
    tag: string;
}
export interface BuildInfo {
    commits: Commit[];
    project: string;
    trigger: Trigger;
    docker: DockerInfo;
    timestamp: number;
}
export function getBuildInfo(): BuildInfo {
    const shaMinLength = parseInt(core.getInput('shaMinLength'), 10);
    const project = core.getInput('project');
    const image = core.getInput('image');
    const tag = github.context.sha.substring(0, shaMinLength);
    const repoString = `${github.context.repo.owner}/${github.context.repo.repo}`;
    core.debug(`Sha min length ${shaMinLength}`);
    return {
        commits: [
            {
                slug: repoString,
                id: github.context.sha
            }
        ],
        project,
        trigger: {
            type: 'commit',
            source: repoString,
            commitIds: [github.context.sha]
        },
        docker: {
            image,
            tag: `sha-${tag}`
        },
        timestamp: new Date().getTime() / 1000
    };
}

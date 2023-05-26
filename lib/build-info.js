"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildInfo = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function getBuildInfo() {
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
exports.getBuildInfo = getBuildInfo;

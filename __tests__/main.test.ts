import {RunTarget, RunOptions} from 'github-action-ts-run-api';
import dotenv from 'dotenv';
import {describe, test, expect} from '@jest/globals';

dotenv.config({path: 'tests.env'});

describe('pipeline-action', () => {
    const target = RunTarget.jsFile('lib/main.js', 'action.yml');
    test('should run target with actions', async () => {
        const res = await target.run(
            RunOptions.create().setInputs({
                pipelineUrl: '',
                project: 'test',
                image: 'testimage'
            })
        );
        expect(res.isSuccess).toEqual(true);
    });
});

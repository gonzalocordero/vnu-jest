# vnu-jest

Simple just plugin to run HTML validation tests. 

## Usage

````
import {  validateHTML } from'vnu-jest';

describe('vnu-cli', () => {
    it('should validate correct valid markup', async () => {
        const html = '<p><span></span></p>';
        try {
            expect(await validateHTML(html));
        } catch (error) {
            throw error;
        }
    })

    it('should fail with incorrect markup', async () => {
        const html = '<span><p></p></span>';
        try {
            expect(await validateHTML(html));
        } catch (error) {
            throw error;
        }
    })
});

````


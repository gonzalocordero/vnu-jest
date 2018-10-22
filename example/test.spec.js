const { validateHTML, toContainCorrectMarkUp } = require('../vnu-cli');


describe('vnu-cli', () => {
    it('should validate correct valid markup', async () => {
        const html = '<p><span></span></p>';
        expect.extend(toContainCorrectMarkUp);
        
        try {
            expect(await validateHTML(html)).toContainCorrectMarkUp();
        } catch (error) {
            throw error;
        }
    });

    it('should fail with incorrect markup', async () => {
        const html = '<span><p></p></span>';
        expect.extend(toContainCorrectMarkUp);

        try {
            expect(await validateHTML(html)).toContainCorrectMarkUp();
        } catch (error) {
            throw error;
        }
    });
});

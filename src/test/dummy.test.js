describe('Your Test Suite', function() {
  it('should do something', async function() {
    const { expect } = await import('chai');
    it('should add numbers correctly', function () {
      const num1 = 2;
      const num2 = 4;
      expect(num1 + num2).to.not.equal(7);
    });
  });
});


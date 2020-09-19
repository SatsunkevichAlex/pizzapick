using Microsoft.VisualStudio.TestTools.UnitTesting;
using PapaService;

namespace UnitTests.PapaService
{
    [TestClass]
    public class PapaPizzaProviderTests
    {
        private PapaPizzaProvider _pizzaProvider;

        [TestInitialize]
        public void Init()
        {
            _pizzaProvider = new PapaPizzaProvider();
        }

        [TestMethod]
        public void PapaPizzaProvider_GetPizzas_Success()
        {
            var pizzas = _pizzaProvider.GetPizzas();

            Assert.IsTrue(pizzas.Count > 0);
        }
    }
}

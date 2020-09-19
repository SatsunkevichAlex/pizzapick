using Microsoft.VisualStudio.TestTools.UnitTesting;
using PizzaFoxDataService;

namespace UnitTests
{
    [TestClass]
    public class PizzaFoxProviderTests
    {
        private PizzaFoxPizzaProvider _pizzaProvider;

        [TestInitialize]
        public void Init()
        {
            _pizzaProvider = new PizzaFoxPizzaProvider();
        }

        [TestMethod]
        public void PizzaFoxPizzaProvider_GetPizzas_Success()
        {
            var pizzas = _pizzaProvider.GetFoxPizzas();

            Assert.IsTrue(pizzas.Count > 0);
        }
    }
}

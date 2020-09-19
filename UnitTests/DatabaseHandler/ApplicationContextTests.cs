using DatabaseInserter;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PapaService;
using PizzaFoxDataService;
using System.Linq;

namespace UnitTests.DatabaseHandler
{
    [TestClass]
    public class ApplicationContextTests
    {
        private ApplicationContext _conext;

        [TestInitialize]
        public void Init()
        {
            _conext = new ApplicationContext();
        }

        [TestMethod]
        public void ApplicationContext_TablesCreation_Succeess()
        {
            var fox = new PizzaFoxPizzaProvider().GetFoxPizzas();
            var papa = new PapaPizzaProvider().GetPizzas();
            _conext.Pizzas.AddRange(fox);
            _conext.Pizzas.AddRange(papa);
            _conext.SaveChanges();

            Assert.IsTrue(
                fox.Count + papa.Count ==
                _conext.Pizzas.Count());
        }
    }
}

using DatabaseInserter;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PapaService;

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
            //var pizzas = new PizzaFoxPizzaProvider().GetFoxPizzas();
            var pizzas = new PapaPizzaProvider().GetPizzas();
            _conext.Pizzas.AddRange(pizzas);
            _conext.SaveChanges();
        }
    }
}

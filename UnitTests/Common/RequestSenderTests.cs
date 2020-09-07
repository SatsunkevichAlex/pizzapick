using Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests
{
    [TestClass]
    public class RequestSenderTests
    {
        private RequestSender _requestSender;

        [TestInitialize]
        public void Init()
        {
            _requestSender = new RequestSender();
        }

        [TestMethod]
        public void RequestSender_GetPizzasData_Success()
        {
            var response = _requestSender.
                GetPizzasData(PizzaProviders.PapaJohns);

            Assert.IsNotNull(response);
        }
    }
}

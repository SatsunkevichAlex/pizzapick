using Common;
using Common.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;

namespace PapaService
{
    public class PapaPizzaProvider
    {
        private readonly RequestSender _requestSender;
        private readonly PapaPizzaCreator _pizzaCreator;

        public PapaPizzaProvider()
        {
            _requestSender = new RequestSender();
            _pizzaCreator = new PapaPizzaCreator();
        }

        public List<Pizza> GetPizzas()
        {
            var pizzaData = _requestSender
                .GetPizzasData(PizzaProviders.PapaJohns);

            var result = new List<Pizza>();
            foreach (var pizza in pizzaData.Children<JObject>())
            {
                var pizzaVairiations =
                    _pizzaCreator.CreateVariations(pizza);
                result.AddRange(pizzaVairiations);
            }

            return result;
        }
    }
}

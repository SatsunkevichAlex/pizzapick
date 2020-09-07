using System.Collections.Generic;
using System.Linq;
using Common;
using Common.Models;

namespace PizzaFoxDataService
{
    public class PizzaFoxPizzaProvider
    {
        private readonly RequestSender _requestSender;
        private readonly FoxPizzaCreator _pizzaCreator;

        public PizzaFoxPizzaProvider()
        {
            _requestSender = new RequestSender();
            _pizzaCreator = new FoxPizzaCreator();
        }

        public List<Pizza> GetFoxPizzas()
        {
            var pizzasData = _requestSender
                .GetPizzasData(PizzaProviders.PizzaFox);
            var result = new List<Pizza>();
            return pizzasData
                .Select(it => _pizzaCreator.CreatePizzaVariations(it))
                .Aggregate(new List<Pizza>(),
                    (result, it) => result.Concat(it).ToList());
        }
    }
}

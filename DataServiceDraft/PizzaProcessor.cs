using System;
using System.Collections.Generic;
using System.Text;

namespace DataServiceDraft
{
    public class PizzaProcessor
    {
        private const string PZZ_URL = "https://pzz.by/pizzas";

        private readonly RequestSender _rs = new RequestSender();
        private readonly PageParser _pp = new PageParser();

        public void Process()
        {            
            var pizzasPage = _rs.GetPizzasPage(PZZ_URL);
             _pp.GetPizzas(pizzasPage);
        }
    }
}

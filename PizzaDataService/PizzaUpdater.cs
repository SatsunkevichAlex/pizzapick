using Common;
using DatabaseInserter;
using PapaService;
using PizzaFoxDataService;
using System;
using System.Linq;
using System.Threading;

namespace PizzaDataService
{
    internal class PizzaUpdater
    {

        public void RunUpdateProcess()
        {
            while (true)
            {
                Logger.WrilteLine($"Start pizza update: {DateTime.Now}");
                var foxDataService = new PizzaFoxPizzaProvider();
                var papaDataService = new PapaPizzaProvider();
                var appContext = new ApplicationContext();

                var foxPizzas = foxDataService.GetFoxPizzas();
                var papaPizzas = papaDataService.GetPizzas();

                var oldPizzas = appContext.Pizzas.ToList();
                var newPizzas = foxPizzas.Concat(papaPizzas);

                appContext.Pizzas.AddRange(newPizzas);
                appContext.SaveChanges();
                appContext.Pizzas.RemoveRange(oldPizzas);
                appContext.SaveChanges();
                Logger.WrilteLine($"Pizzas updated: {DateTime.Now}");

                var waitTime = TimeSpan.FromHours(0.1);
                Logger.WrilteLine($"Next update after: {waitTime.TotalHours} hours");
                Thread.Sleep(waitTime);
            }
        }
    }
}

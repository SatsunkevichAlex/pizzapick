using PapaService;
using PizzaFoxDataService;

namespace TestConsoleApp
{
    class EntryPoint
    {
        static void Main()
        {
            var foxDataService = new PizzaFoxPizzaProvider();
            var papaDataService = new PapaPizzaProvider();

            var foxPizzas = foxDataService.GetFoxPizzas();
            var papaPizzas = papaDataService.GetPizzas();
        }
    }
}

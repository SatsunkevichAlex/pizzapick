using PizzaFoxDataService;

namespace TestConsoleApp
{
    class EntryPoint
    {
        static void Main()
        {
            var foxDataService = new PizzaFoxPizzaProvider();
            var foxPizzas = foxDataService.GetFoxPizzas();
        }
    }
}

namespace PizzaDataService
{
    class EntryPoint
    {
        static void Main()
        {
            var pizzaUpdater = new PizzaUpdater();
            pizzaUpdater.RunUpdateProcess();
        }
    }
}

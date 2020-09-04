namespace Common.Models
{
    public class Pizza
    {
        public string Name { get; set; }
        public Params Params { get; set; }
        public Composition Composition { get; set; }
        public Producer Producer { get; set; }

        public Pizza(
            string name,
            Composition composition,
            Producer producer,
            Params parameters)
        {
            Name = name;
            Composition = composition;
            Producer = producer;
            Params = parameters;
        }
    }
}
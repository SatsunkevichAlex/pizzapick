using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class Pizza
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        virtual public Params Params { get; set; }
        virtual public Composition Composition { get; set; }
        virtual public Producer Producer { get; set; }

        public Pizza()
        { }

        public Pizza(
            string name,
            Composition composition,
            Producer producer,
            Params parameters,
            double price)
        {
            Name = name;
            Composition = composition;
            Producer = producer;
            Params = parameters;
            Price = price;
        }
    }
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Common.Models
{
    public class Pizza
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        
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
            double price,
            string photoPath)
        {
            Name = name;
            Composition = composition;
            Producer = producer;
            Params = parameters;
            Price = price;
            ImageUrl = photoPath;
        }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class Producer
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoPath { get; set; }

        public int PizzaId { get; set; }        
    }
}

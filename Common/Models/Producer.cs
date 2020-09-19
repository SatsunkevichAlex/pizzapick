using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class Producer
    {
        [Key]        
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
        public string Link { get; set; }

        [JsonIgnore]
        public int PizzaId { get; set; }        
    }
}

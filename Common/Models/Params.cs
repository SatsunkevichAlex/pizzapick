using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Common.Models
{
    public class Params
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public string SizeName { get; set; }
        public int? Mass { get; set; }
        public int Diameter { get; set; }
        public bool IsCheesSide { get; set; }
        public bool IsHotDogSide { get; set; }
        public bool IsThin { get; set; }

        [JsonIgnore]
        public int PizzaId { get; set; }        
    }
}

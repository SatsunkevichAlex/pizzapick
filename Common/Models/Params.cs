using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class Params
    {
        [Key]
        public int Id { get; set; }
        public string SizeName { get; set; }
        public int? Mass { get; set; }
        public int Diameter { get; set; }
        public bool IsCheesSide { get; set; }
        public bool IsHotDogSide { get; set; }
        public bool IsThin { get; set; }

        public int PizzaId { get; set; }
        //public virtual Pizza Pizza { get; set; }
    }
}

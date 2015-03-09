class Mondrian
  
  include DatabaseMethods
  extend ClassMethods
  
  attr_reader :id
  attr_accessor :name, :box_colors
  
  def initialize(options)
    @id = options["id"]
    @name = options["name"]
    @box_colors = options["box_colors"]
  end
  
  def to_hash
    hash = {
      id: id,
      name: name,
      box_colors: box_colors
    }
  end
  
end #classend
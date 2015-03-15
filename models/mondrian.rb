class Mondrian<ActiveRecord::Base
   
  def to_hash
    hash = {
      id: id,
      name: name,
      box_colors: box_colors
    }
  end
  
end #classend
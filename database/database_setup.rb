unless ActiveRecord::Base.connection.table_exists?(:mondrians)
  ActiveRecord::Base.connection.create_table :mondrians do |t|
    t.text :name
    t.text :box_colors
  end
end
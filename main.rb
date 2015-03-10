require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)
require 'active_support/inflector'
DATABASE = SQLite3::Database.new("mondrian-storage.db")
require_relative "database/database_setup"

require_relative "models/model_db_methods"
require_relative "models/mondrian"


binding.pry
get "/" do 
  @mondrians = Mondrian.all
  erb :"mondrian"
end

post "/new" do
  mondrian = Mondrian.new(params)
  mondrian.insert
  mondrian.to_hash.to_json
end

post "/save" do
  mondrian = Mondrian.find(params["id"])
  mondrian.edit(params)
  mondrian.save
  mondrian.to_hash.to_json
end

post "/load" do
  mondrian = Mondrian.find(params["id"])
  mondrian.to_hash.to_json
end
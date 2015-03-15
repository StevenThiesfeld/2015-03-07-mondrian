require 'rubygems'
require 'bundler/setup'
require "pry"
require "sinatra"
require "sinatra/activerecord"
require "json"
require 'active_support/inflector'

configure :development do
  require "sqlite3"
  set :database, {adapter: "sqlite3", database: "mondrian-storage.db"}
end

configure :production do
  require 'pg'
 db = URI.parse(ENV['DATABASE_URL'])
 ActiveRecord::Base.establish_connection(
 :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
 :host => db.host,
 :username => db.user,
 :password => db.password,
 :database => db.path[1..-1],
 :encoding => 'utf8'
 )
end
require_relative "database/database_setup"
require_relative "models/mondrian"


get "/" do 
  @mondrians = Mondrian.all
  erb :"mondrian"
end

post "/new" do
  mondrian = Mondrian.new(params)
  mondrian.save
  mondrian.to_hash.to_json
end

post "/save" do
  mondrian = Mondrian.find(params["id"])
  mondrian.update(params)
  mondrian.to_hash.to_json
end

post "/load" do
  mondrian = Mondrian.find(params["id"])
  binding.pry
  mondrian.to_hash.to_json
end
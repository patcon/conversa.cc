# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ActiveRecord::Base.establish_connection
ActiveRecord::Base.connection.tables.each do |table|
  next if table == 'schema_migrations'

  # MySQL and PostgreSQL
  ActiveRecord::Base.connection.execute("TRUNCATE #{table}")

  # SQLite
  # ActiveRecord::Base.connection.execute("DELETE FROM #{table}")
end

org = Organization.create!(name: 'DS', uid: '402281', api_key: 'pkey_DSdDhue76HwR4y2WugRT2')
org2= Organization.create!(name: 'OS', uid: 402282, api_key: 'pkey_OSFDhue76HwR4y2WugRT2')
#org3 = Organization.create!(name: 'Ford & Sloan', uid: 402283, api_key: 'pkey_FFdDhue76HwR4y2WugRT2')


user = User.create! first_name: 'matthew', last_name: 'bergman', :email => 'mzbphoto@gmail.com', :password => 'password123',
:password_confirmation => 'password123', organization: org

admin = Admin.create!  first_name: 'matthew', last_name: 'bergman',:email => 'matt@novafabrica.com',
:password => 'password123', :password_confirmation => 'password123'

class CreateResponseUsers < ActiveRecord::Migration
  def change
    create_table :response_users do |t|
      t.belongs_to :user
      t.belongs_to :response

      t.timestamps
    end
  end
end

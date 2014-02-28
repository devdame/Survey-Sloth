class CreateUserResponses < ActiveRecord::Migration
  def change
    create_table :users_responses do |t|
      t.belongs_to :user
      t.belongs_to :response

      t.timestamps
    end
  end
end

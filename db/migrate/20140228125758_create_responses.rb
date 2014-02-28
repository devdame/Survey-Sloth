class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :text

      t.belongs_to :question
      t.timestamps
    end
  end
end

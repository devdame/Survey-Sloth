class CreateCompletionUsers < ActiveRecord::Migration
  def change
    create_table :completion_users do |t|
      t.belongs_to :user
      t.belongs_to :survey

      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, not_null: false
      t.timestamps
    end
  end
end

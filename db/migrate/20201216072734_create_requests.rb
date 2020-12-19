class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :type_req
      t.integer :operator_id
      t.belongs_to :user
      t.belongs_to :product
      t.timestamps
    end
  end
end

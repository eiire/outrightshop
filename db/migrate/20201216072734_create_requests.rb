class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :type
      t.belongs_to :user

      t.timestamps
    end
  end
end

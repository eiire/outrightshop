require 'rails_helper'

RSpec.describe Request, type: :model do
  it 'is valid with valid attributes' do
    u1 = User.create!({ email: 'guy@gmail.com', role: ['manager'], password: '111111', password_confirmation: '111111' })
    u2 = User.create!({ email: 'guy2@gmail.com', role: ['manager'], password: '111111', password_confirmation: '111111' })
    p = Product.new
    p.id = 1
    p.user = u1

    expect(Request.new(type_req: 'processing', operator_id: u1, user: u2, product: p)).to be_valid
  end

  it 'is not valid with invalid attributes' do
    expect(Product.new).to_not be_valid
  end
end

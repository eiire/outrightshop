require 'rails_helper'

RSpec.describe 'pages/home.html.erb', type: :view do
  it 'renders "Hello World"' do
    render
    expect(rendered).to match(/product_list/)
  end
end

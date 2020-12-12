require 'rails_helper'

RSpec.describe 'page/page.html.erb', type: :view do
  it 'renders "Hello World"' do
    render
    expect(rendered).to match(/YO/)
  end
end

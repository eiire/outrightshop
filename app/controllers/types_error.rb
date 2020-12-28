class TypesError
  attr_accessor :types

  def initialize
    @types = {
      request_not_valid: 422,
      anonymous_user: 404
    }
  end
end

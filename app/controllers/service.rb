class Service
  protected

  def success(data = nil)
    Result.new(true, data: data)
  end

  def error(data = nil, code: nil)
    Result.new(false, data: data, error_code: TypesError.new.types[code])
  end
end

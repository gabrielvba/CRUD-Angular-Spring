package exception;

public class RecordNotFoundException extends RuntimeException {
	private static final long serialVersionID = 1L;
	
	public RecordNotFoundException(Long id) {
		super("Registro não encontrado com o id: " + id);
	}
}
